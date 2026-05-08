import { useEffect, useRef } from "react";
import {
  getContourMask,
  getDiceConfident,
} from "../../shared/utils/contourScore";
import type { CanvasProps, Point } from "./types";

const Canvas = ({
  width,
  height,
  canvasRef,
  onChangeScore,
  onDrawChange,
  skeletonCanvasRef,
}: CanvasProps) => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const points = useRef<Point[]>([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    contextRef.current = ctx;

    onChangeScore(0);
    onDrawChange(false);
  }, [canvasRef, width, height, onChangeScore, onDrawChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    if (!canvas || !ctx) return;

    const getCanvasPoint = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      const point = getCanvasPoint(e);

      isDrawing.current = true;
      points.current = [point];
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing.current) return;

      e.preventDefault();
      const point = getCanvasPoint(e);

      onDrawChange(true);
      points.current.push(point);

      if (points.current.length < 3) {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();

        return;
      }

      const prev = points.current[points.current.length - 3];
      const curr = points.current[points.current.length - 2];
      const mid = {
        x: (prev.x + curr.x) / 2,
        y: (prev.y + curr.y) / 2,
      };

      ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);
      ctx.stroke();
    };

    const finishDrawing = async (e?: PointerEvent) => {
      if (e) {
        e.preventDefault();
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      }

      if (!isDrawing.current) return;

      isDrawing.current = false;

      if (!skeletonCanvasRef.current || !canvasRef.current) return;

      const skeletonContourMask = await getContourMask(
        skeletonCanvasRef.current
      );
      const userContourMask = await getContourMask(canvasRef.current);
      const score = await getDiceConfident(
        skeletonContourMask,
        userContourMask
      );

      onChangeScore(score);

      ctx.beginPath();
    };

    const handlePointerCancel = (e: PointerEvent) => {
      e.preventDefault();
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
      isDrawing.current = false;
      ctx.beginPath();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", finishDrawing);
    canvas.addEventListener("pointercancel", handlePointerCancel);
    canvas.addEventListener("lostpointercapture", handlePointerCancel);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", finishDrawing);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      canvas.removeEventListener("lostpointercapture", handlePointerCancel);
    };
  }, [canvasRef, onChangeScore, onDrawChange, skeletonCanvasRef, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-10 touch-none"
      width={width}
      height={height}
    />
  );
};

export default Canvas;

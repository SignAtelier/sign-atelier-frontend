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
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    if (!canvas || !ctx) return;

    const handleMouseDown = (e: MouseEvent) => {
      const point = { x: e.offsetX, y: e.offsetY };

      isDrawing.current = true;
      points.current = [point];
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;

      const point = { x: e.offsetX, y: e.offsetY };

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

    const handleMouseUp = async () => {
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

    const handleMouseLeave = () => {
      isDrawing.current = false;
      ctx.beginPath();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-10"
      width={width}
      height={height}
    />
  );
};

export default Canvas;

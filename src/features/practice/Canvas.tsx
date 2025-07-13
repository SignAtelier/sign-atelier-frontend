import { useEffect, useRef } from "react";
import type { CanvasProps, Point } from "./types";

const Canvas = ({ width, height, canvasRef }: CanvasProps) => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const points = useRef<Point[]>([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    context.scale(dpr, dpr);
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.lineCap = "round";
    context.lineJoin = "round";

    contextRef.current = context;
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const handleMouseDown = (e: MouseEvent) => {
      const point = { x: e.offsetX, y: e.offsetY };
      isDrawing.current = true;
      points.current = [point];
      context.beginPath();
      context.moveTo(point.x, point.y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;

      const point = { x: e.offsetX, y: e.offsetY };
      points.current.push(point);

      if (points.current.length < 3) {
        context.lineTo(point.x, point.y);
        context.stroke();
        return;
      }

      const prev = points.current[points.current.length - 3];
      const curr = points.current[points.current.length - 2];
      const mid = {
        x: (prev.x + curr.x) / 2,
        y: (prev.y + curr.y) / 2,
      };

      context.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);
      context.stroke();
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
      context.beginPath();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-10 w-full h-full bg-transparent border border-gray-400"
    />
  );
};

export default Canvas;

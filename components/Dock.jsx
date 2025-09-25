"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { cn } from "@/lib/utils"; // make sure path is correct

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export function Dock({
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  disableMagnification = false,
  direction = "middle",
  className,
  ...props
}) {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === DockIcon) {
        return React.cloneElement(child, {
          mouseX,
          size: iconSize,
          magnification: iconMagnification,
          disableMagnification,
          distance: iconDistance,
        });
      }
      return child;
    });
  };

  return (
    <motion.div
      {...props}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-4 rounded-full border border-gray-200 p-3 backdrop-blur-md supports-backdrop-blur:bg-white/20 supports-backdrop-blur:dark:bg-black/20 shadow-lg",
        direction === "top"
          ? "items-start"
          : direction === "middle"
          ? "items-center"
          : "items-end",
        className
      )}
    >
      {renderChildren()}
    </motion.div>
  );
}

export function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  href,
  onClick,
  className,
  children,
  ...props
}) {
  const ref = useRef(null);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = disableMagnification ? size : magnification;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  );

  const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const padding = Math.max(8, size * 0.25);

  const content = (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-white/10 dark:bg-black/10 shadow-md hover:shadow-lg transition-all duration-200",
        disableMagnification && "hover:bg-muted-foreground",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-center">{children}</div>
    </motion.div>
  );

  // Wrap with <a> if href is provided, else use onClick directly
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

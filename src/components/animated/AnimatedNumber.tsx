/** @format */

"use client";

import { useInView, useSpring, animated } from "@react-spring/web";
import React, { FC } from "react";

type Props = {
  endValue: number;
  addClass?: string;
  animationConfig?: any;
};

const AnimatedNumber: FC<Props> = ({ endValue, animationConfig, addClass }) => {
  const [refNumber, inView] = useInView({ once: true });
  const animNumber = useSpring({
    number: inView ? endValue : 0,
    from: { number: 0 },
    config: animationConfig,
    delay: 1000,
  });

  return (
    <animated.span ref={refNumber} className={addClass}>
      {animNumber.number.to((value) => Math.floor(value))}
    </animated.span>
  );
};

export default AnimatedNumber;

import { useEffect, useRef, useState } from 'react';

function Counter({ target, prefix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;

            const numericTarget = Number(target);
            const increment = numericTarget / 200;
            let current = 0;

            const step = () => {
              current += increment;
              if (current < numericTarget) {
                setValue(Math.ceil(current));
                requestAnimationFrame(step);
              } else {
                setValue(numericTarget);
              }
            };

            step();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span className="counter" ref={ref}>
      {prefix}
      {value}
    </span>
  );
}

export default Counter;

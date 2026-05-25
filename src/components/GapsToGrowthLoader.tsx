import Image from 'next/image';
import type { CSSProperties } from 'react';

type GapsToGrowthLoaderProps = {
  label?: string;
  className?: string;
  fullScreen?: boolean;
};

const rings = [
  {
    color: 'rgba(255, 91, 117, 0.42)',
    rotate: '-8deg',
    x: '1px',
    y: '3px',
  },
  {
    color: 'rgba(255, 188, 84, 0.36)',
    rotate: '18deg',
    x: '4px',
    y: '-1px',
  },
  {
    color: 'rgba(210, 245, 83, 0.34)',
    rotate: '44deg',
    x: '0px',
    y: '-5px',
  },
  {
    color: 'rgba(64, 177, 255, 0.32)',
    rotate: '86deg',
    x: '-5px',
    y: '1px',
  },
  {
    color: 'rgba(188, 91, 255, 0.28)',
    rotate: '126deg',
    x: '-2px',
    y: '4px',
  },
  {
    color: 'rgba(255, 116, 185, 0.3)',
    rotate: '168deg',
    x: '3px',
    y: '2px',
  },
];

export default function GapsToGrowthLoader({
  label = 'Loading',
  className = '',
  fullScreen = false,
}: GapsToGrowthLoaderProps) {
  return (
    <div
      className={[
        'g2g-loader-wrap flex items-center justify-center',
        fullScreen ? 'min-h-screen w-full' : 'min-h-[320px] w-full',
        className,
      ].join(' ')}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="relative flex flex-col items-center gap-3">
        <div className="g2g-loader-stage relative h-36 w-36 sm:h-40 sm:w-40">
          <div className="g2g-loader-orbit absolute inset-0">
            {rings.map((ring, index) => (
              <span
                key={ring.color}
                className="g2g-loader-ring absolute rounded-full"
                style={
                  {
                    '--ring-index': index,
                    '--ring-color': ring.color,
                    '--ring-rotate': ring.rotate,
                    '--ring-x': ring.x,
                    '--ring-y': ring.y,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
               <Image
                 src="/assets/loading/gapstogrowth.png"
                 alt="GapsToGrowth"
                 width={500}
                 height={500}
                 className="h-14 w-14 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
               />
            </div>
          </div>
        </div>

        <span className="text-sm font-semibold tracking-normal text-[#1f2a6d]">
          {label}
        </span>
      </div>
    </div>
  );
}

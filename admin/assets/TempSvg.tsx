import React from "react";

const CustomSvg: React.FC = () => (
 <svg
  className="w-full h-full"
  viewBox="0 0 606 764"
  preserveAspectRatio="none"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
> 
    <path
      d="M0 64.3368C0 28.8046 28.6538 0 64 0H401.243C427.125 0 450.46 15.6712 460.368 39.7076L494.105 121.55C500.748 137.667 513.618 150.381 529.764 156.777L565.465 170.921C589.924 180.61 606 204.35 606 230.777V699.663C606 735.195 577.346 764 542 764H133.947C104.129 764 78.2622 743.301 71.5763 714.089L62.9101 676.227C59.1243 659.686 48.9902 645.32 34.7153 636.257L29.8244 633.151C11.2582 621.364 0 600.83 0 578.755V64.3368Z"
      fill="#71A5C3"
    />
    <mask
      id="mask0_651_4604"
      style={{ maskType: 'alpha' } as React.CSSProperties}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="606"
      height="764"
    >
      <path
        d="M0 64.3368C0 28.8046 28.6538 0 64 0H401.243C427.125 0 450.46 15.6712 460.368 39.7076L494.105 121.55C500.748 137.667 513.618 150.381 529.764 156.777L565.465 170.921C589.924 180.61 606 204.35 606 230.777V699.663C606 735.195 577.346 764 542 764H133.947C104.129 764 78.2622 743.301 71.5763 714.089L62.9101 676.226C59.1243 659.686 48.9902 645.32 34.7153 636.257L29.8244 633.151C11.2582 621.364 0 600.83 0 578.755V64.3368Z"
        fill="#62C710"
      />
    </mask>
    <g mask="url(#mask0_651_4604)">
      <g filter="url(#filter0_f_651_4604)">
        <circle cx="70" cy="101" r="418" fill="#7573FF" fillOpacity="0.32" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_651_4604"
        x="-748"
        y="-717"
        width="1636"
        height="1636"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="200"
          result="effect1_foregroundBlur_651_4604"
        />
      </filter>
    </defs>
  </svg>
);

export default CustomSvg;

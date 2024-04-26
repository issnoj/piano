import React from 'react';
import { STAFF_LINE_HEIGHT } from './consts';

export const GClef = (props: React.SVGAttributes<SVGPathElement>) => {
  return (
    <path
      d="M31.8784 1.00114C26.4514 0.860239 20.1044 13.8191 20.3154 25.3761C20.3644 28.8961 21.4754 36.0351 23.0964 45.0011C12.8734 55.5821 1.00244 66.4411 1.00244 80.6891C0.839444 93.7461 8.81944 110.381 27.7524 110.221C30.6584 110.201 33.2734 109.841 35.5964 109.221C37.3274 118.711 38.4784 126.201 38.4714 129.661C38.5324 143.301 20.6114 144.651 19.7524 136.811C23.5294 136.681 26.5344 133.681 26.5344 129.971C26.5344 126.181 23.3964 123.091 19.5024 123.091C17.3614 123.091 15.4534 124.031 14.1594 125.501C14.1294 125.531 14.0944 125.561 14.0654 125.591C13.7734 125.901 13.5274 126.271 13.2844 126.691C12.4864 128.041 11.9684 129.981 11.9404 132.751C11.9404 144.171 40.8154 151.521 40.8154 129.001C40.8604 125.971 39.5574 118.281 37.6594 108.591C58.2624 101.141 53.0864 70.5511 34.1284 70.4071C32.6584 70.4221 31.2414 70.5931 29.8784 70.9391C28.7984 65.7421 27.7564 60.6981 26.8464 56.0631C34.0454 48.9921 40.3314 39.8391 40.1904 22.9701C40.2124 10.8561 36.1764 1.14214 31.8784 1.00114ZM33.1594 12.7201C35.6154 12.4831 37.5654 14.7631 37.5654 19.7821C37.7644 28.4021 31.7254 35.9301 24.5344 43.5011C23.8464 39.3541 23.3954 35.9941 23.3464 34.0011C23.5504 20.5351 29.0654 13.1151 33.1594 12.7201ZM25.4404 57.4071C26.3174 61.9221 27.2644 66.6791 28.2214 71.4701C15.6734 75.9341 9.65145 93.4241 27.4404 101.251C16.5974 92.0201 21.9344 81.0931 29.7524 79.1891C31.7184 89.0051 33.6384 98.6911 35.1904 107.061C33.0834 107.801 30.6244 108.231 27.7524 108.251C20.5714 108.251 6.22144 103.681 6.22144 86.3761C6.22144 71.8821 16.2684 65.9921 25.4404 57.4071ZM31.5344 78.8761C31.8474 78.8571 32.1864 78.8651 32.5024 78.8761C45.5654 78.8761 50.4924 99.6211 37.1904 106.251C35.5354 97.9311 33.5284 88.3911 31.5344 78.8761Z"
      fill="black"
      stroke="black"
      {...props}
    />
  );
};

export const StaffLines = (props: React.SVGAttributes<SVGGElement>) => {
  const lineTop = 39.5;
  return (
    <g {...props}>
      {[...Array(5)].map((_, i) => (
        <HLine
          key={i}
          y1={lineTop + STAFF_LINE_HEIGHT * i}
          y2={lineTop + STAFF_LINE_HEIGHT * i}
        />
      ))}
      <VLine x1="0.5" y1={lineTop - 0.5} x2="0.5" y2={STAFF_LINE_HEIGHT * 6} />
      <VLine
        x1="100%"
        y1={lineTop - 0.5}
        x2="100%"
        y2={STAFF_LINE_HEIGHT * 6}
      />
    </g>
  );
};

export const HLine = (
  props: React.SVGLineElementAttributes<SVGLineElement>,
) => {
  return <line x2="100%" stroke="black" {...props} />;
};

export const VLine = (
  props: React.SVGLineElementAttributes<SVGLineElement>,
) => {
  return <line x1="0.5" x2="0.5" stroke="black" {...props} />;
};

export const NoteIcon = (props: React.SVGAttributes<SVGPathElement>) => {
  return (
    <path
      d="M14.7584 0C23.1045 0.0751895 30.9994 3.2331 31.6007 10.2259C32.0514 15.3406 25.2844 20 16.9387 20C8.51732 19.9247 0.697717 16.8423 0.021112 9.85193C-0.429975 4.65944 6.4077 0 14.7584 0ZM16.7837 18.2708C20.3928 18.2708 22.7236 14.8098 22.3477 12.0303C21.5206 6.54169 19.6408 2.1031 14.6786 2.1031C11.0696 2.1031 8.96414 5.63695 9.41538 8.41891C10.2471 13.9101 11.8261 18.2708 16.7837 18.2708Z"
      fill="black"
      {...props}
    />
  );
};

export const FlatIcon = (props: React.SVGAttributes<SVGPathElement>) => {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.07562 24.3074L2.1504 34.4136C2.99793 33.6159 3.01039 33.4086 3.82052 32.6926C4.63689 31.7567 5.17905 31.2856 6.11382 30.1802C7.04859 29.0747 7.75278 27.8625 8.0893 26.7193C8.42582 25.5762 8.30118 25.1868 8.10177 24.3702C7.90235 23.5537 7.49105 22.9382 6.91149 22.5927C6.3257 22.2473 5.59035 22.1845 4.78022 22.398C4.00748 22.6681 3.73328 22.7749 2.91068 23.4972C2.54924 23.8615 2.49315 23.9306 2.07562 24.3074ZM0.0565209 0.031405C0.85419 0 1.22187 0.0628099 2.01954 0C2.05069 0.866777 2.03823 22.1907 2.01954 22.197C3.40299 21.2423 3.25966 21.2298 4.64312 20.7021C6.02035 20.1745 7.37888 19.9673 8.58161 20.118C9.77812 20.2625 10.7752 20.7524 11.4732 21.5375C12.1711 22.3226 12.9937 23.4595 13 24.6717C13.0062 25.884 12.3892 27.4165 11.523 28.4403C10.339 29.8347 8.94306 30.9339 7.32902 32.0645C5.73992 33.1762 4.25675 34.3193 3.07271 35.3871C1.92606 36.3293 1.37766 36.8569 0.0876798 38C0.0565209 36.9448 -0.00579704 35.7702 0.000434757 34.9412L0.0565209 0.031405Z"
      fill="black"
      {...props}
    />
  );
};

export const SharpIcon = (props: React.SVGAttributes<SVGPathElement>) => {
  return (
    <path
      d="M1.07286 16.9931C1.11705 16.9172 1.1723 16.8483 1.24411 16.8069L4.27686 14.9655V6.85517C4.27686 6.7931 4.29343 6.73793 4.31553 6.68276C4.34315 6.62759 4.3763 6.58621 4.41496 6.55862C4.45916 6.52414 4.50888 6.51034 4.55307 6.51034H5.65237C5.70209 6.51034 5.75181 6.52414 5.79048 6.55862C5.83467 6.58621 5.86781 6.62759 5.89543 6.68276C5.91753 6.73793 5.92858 6.7931 5.92858 6.85517V13.9586L11.5522 10.5448V1.34483C11.5522 1.28276 11.5687 1.22759 11.5908 1.17241C11.6184 1.11724 11.6516 1.07586 11.6903 1.04828C11.7344 1.01379 11.7842 1 11.8284 1H12.9277C12.9774 1 13.0271 1.01379 13.0658 1.04828C13.11 1.07586 13.1431 1.11724 13.1707 1.17241C13.1928 1.22759 13.2039 1.28276 13.2039 1.34483V9.53793L15.4632 8.16552C15.5295 8.12414 15.6069 8.11034 15.6842 8.11034C15.756 8.11724 15.8278 8.15172 15.8941 8.2069C15.9549 8.25517 16.0046 8.33103 16.0378 8.41379H16.0322L16.789 10.3448C16.8222 10.4276 16.8388 10.5241 16.8332 10.6207C16.8277 10.7103 16.8001 10.8 16.7614 10.8828C16.7172 10.9586 16.662 11.0207 16.5902 11.0621L13.2039 13.1103V23.3379L15.629 21.8621C15.6953 21.8207 15.7726 21.8069 15.8499 21.8069C15.9217 21.8138 15.9936 21.8483 16.0598 21.9034C16.1206 21.9517 16.1703 22.0276 16.2035 22.1103H16.198L16.9548 24.0414C16.9879 24.1241 17.0045 24.2207 16.999 24.3172C16.9934 24.4069 16.9658 24.4966 16.9271 24.5793C16.8829 24.6552 16.8277 24.7172 16.7559 24.7586L13.2039 26.9172V35.1448C13.2039 35.2069 13.1928 35.2621 13.1707 35.3172C13.1431 35.3724 13.11 35.4138 13.0658 35.4414C13.0271 35.4759 12.9774 35.4897 12.9277 35.4897H11.8284C11.7842 35.4897 11.7344 35.4759 11.6903 35.4414C11.6516 35.4138 11.6184 35.3724 11.5908 35.3172C11.5687 35.2621 11.5522 35.2069 11.5522 35.1448V27.9241L5.92858 31.3379V40.6552C5.92858 40.7172 5.91753 40.7724 5.89543 40.8276C5.86781 40.8828 5.83467 40.9241 5.79048 40.9517C5.75181 40.9862 5.70209 41 5.65237 41H4.55307C4.50888 41 4.45916 40.9862 4.41496 40.9517C4.3763 40.9241 4.34315 40.8828 4.31553 40.8276C4.29343 40.7724 4.27686 40.7172 4.27686 40.6552V32.3448L2.53676 33.4C2.47047 33.4414 2.39313 33.4621 2.32132 33.4552C2.24398 33.4483 2.17216 33.4138 2.1114 33.3655C2.04511 33.3103 1.99539 33.2414 1.96225 33.1517L1.21096 31.2207C1.17782 31.1379 1.16125 31.0483 1.16677 30.9517C1.1723 30.8552 1.19992 30.7655 1.23858 30.6897C1.28278 30.6138 1.33802 30.5448 1.40983 30.5034L4.27686 28.7655V18.5448L2.37103 19.7034C2.30474 19.7448 2.22741 19.7655 2.15559 19.7586C2.07825 19.7517 2.00644 19.7172 1.94567 19.669C1.87938 19.6138 1.82967 19.5448 1.79652 19.4552L1.04524 17.5241C1.0121 17.4414 0.995523 17.3517 1.00105 17.2552C1.00657 17.1586 1.03419 17.069 1.07286 16.9931ZM5.92858 17.5379V27.7586L11.5522 24.3448V14.1241L5.92858 17.5379Z"
      fill="black"
      stroke="black"
      strokeWidth="0.5"
      {...props}
    />
  );
};

export const DoubleSharpIcon = (props: React.SVGAttributes<SVGPathElement>) => {
  return (
    <path
      d="M16.82 6H20V0H14V3.18L10 7.18L6 3.18V0H0V6H3.18L7.18 10L3.18 14H0V20H6V16.82L10 12.82L14 16.82V20H20V14H16.82L12.82 10L16.82 6Z"
      fill="black"
      {...props}
    />
  );
};

export const DoubleFlat = (props: React.SVGAttributes<SVGGElement>) => {
  return (
    <g {...props}>
      {/*<path*/}
      {/*  fillRule="evenodd"*/}
      {/*  clipRule="evenodd"*/}
      {/*  d="M2.07562 24.3074L2.1504 34.4136C2.99793 33.6159 3.01039 33.4086 3.82052 32.6926C4.63689 31.7567 5.17905 31.2856 6.11382 30.1802C7.04859 29.0747 7.75278 27.8625 8.0893 26.7193C8.42582 25.5762 8.30118 25.1868 8.10177 24.3702C7.90235 23.5537 7.49105 22.9382 6.91149 22.5927C6.3257 22.2473 5.59035 22.1845 4.78022 22.398C4.00748 22.6681 3.73328 22.7749 2.91068 23.4972C2.54924 23.8615 2.49315 23.9306 2.07562 24.3074ZM0.0565209 0.031405C0.85419 0 1.22187 0.0628099 2.01954 0C2.05069 0.866777 2.03823 22.1907 2.01954 22.197C3.40299 21.2423 3.25966 21.2298 4.64312 20.7021C6.02035 20.1745 7.37888 19.9673 8.58161 20.118C9.77812 20.2625 10.7752 20.7524 11.4732 21.5375C12.1711 22.3226 12.9937 23.4595 13 24.6717C13.0062 25.884 12.3892 27.4165 11.523 28.4403C10.339 29.8347 8.94306 30.9339 7.32902 32.0645C5.73992 33.1762 4.25675 34.3193 3.07271 35.3871C1.92606 36.3293 1.37766 36.8569 0.0876798 38C0.0565209 36.9448 -0.00579704 35.7702 0.000434757 34.9412L0.0565209 0.031405Z"*/}
      {/*  fill="black"*/}
      {/*/>*/}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0756 24.3074L15.1504 34.4136C15.9979 33.6159 16.0104 33.4086 16.8205 32.6926C17.6369 31.7567 18.1791 31.2856 19.1138 30.1802C20.0486 29.0747 20.7528 27.8625 21.0893 26.7193C21.4258 25.5762 21.3012 25.1868 21.1018 24.3702C20.9023 23.5537 20.491 22.9382 19.9115 22.5927C19.3257 22.2473 18.5904 22.1845 17.7802 22.398C17.0075 22.6681 16.7333 22.7749 15.9107 23.4972C15.5492 23.8615 15.4932 23.9306 15.0756 24.3074ZM13.0565 0.031405C13.8542 0 14.2219 0.0628099 15.0195 0C15.0507 0.866777 15.0382 22.1907 15.0195 22.197C16.403 21.2423 16.2597 21.2298 17.6431 20.7021C19.0203 20.1745 20.3789 19.9673 21.5816 20.118C22.7781 20.2625 23.7752 20.7524 24.4732 21.5375C25.1711 22.3226 25.9937 23.4595 26 24.6717C26.0062 25.884 25.3892 27.4165 24.523 28.4403C23.339 29.8347 21.9431 30.9339 20.329 32.0645C18.7399 33.1762 17.2567 34.3193 16.0727 35.3871C14.9261 36.3293 14.3777 36.8569 13.0877 38C13.0565 36.9448 12.9942 35.7702 13.0004 34.9412L13.0565 0.031405Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.07562 24.3074L2.1504 34.4136C2.99793 33.6159 3.01039 33.4086 3.82052 32.6926C4.63689 31.7567 5.17905 31.2856 6.11382 30.1802C7.04859 29.0747 7.75278 27.8625 8.0893 26.7193C8.42582 25.5762 8.30118 25.1868 8.10177 24.3702C7.90235 23.5537 7.49105 22.9382 6.91149 22.5927C6.3257 22.2473 5.59035 22.1845 4.78022 22.398C4.00748 22.6681 3.73328 22.7749 2.91068 23.4972C2.54924 23.8615 2.49315 23.9306 2.07562 24.3074ZM0.0565209 0.031405C0.85419 0 1.22187 0.0628099 2.01954 0C2.05069 0.866777 2.03823 22.1907 2.01954 22.197C3.40299 21.2423 3.25966 21.2298 4.64312 20.7021C6.02035 20.1745 7.37888 19.9673 8.58161 20.118C9.77812 20.2625 10.7752 20.7524 11.4732 21.5375C12.1711 22.3226 12.9937 23.4595 13 24.6717C13.0062 25.884 12.3892 27.4165 11.523 28.4403C10.339 29.8347 8.94306 30.9339 7.32902 32.0645C5.73992 33.1762 4.25675 34.3193 3.07271 35.3871C1.92606 36.3293 1.37766 36.8569 0.0876798 38C0.0565209 36.9448 -0.00579704 35.7702 0.000434757 34.9412L0.0565209 0.031405Z"
        fill="black"
      />

      {/*<path*/}
      {/*  fillRule="evenodd"*/}
      {/*  clipRule="evenodd"*/}
      {/*  d="M2.07562 24.3074L2.1504 34.4136C2.99793 33.6159 3.01039 33.4086 3.82052 32.6926C4.63689 31.7567 5.17905 31.2856 6.11382 30.1802C7.04859 29.0747 7.75278 27.8625 8.0893 26.7193C8.42582 25.5762 8.30118 25.1868 8.10177 24.3702C7.90235 23.5537 7.49105 22.9382 6.91149 22.5927C6.3257 22.2473 5.59035 22.1845 4.78022 22.398C4.00748 22.6681 3.73328 22.7749 2.91068 23.4972C2.54924 23.8615 2.49315 23.9306 2.07562 24.3074ZM0.0565209 0.031405C0.85419 0 1.22187 0.0628099 2.01954 0C2.05069 0.866777 2.03823 22.1907 2.01954 22.197C3.40299 21.2423 3.25966 21.2298 4.64312 20.7021C6.02035 20.1745 7.37888 19.9673 8.58161 20.118C9.77812 20.2625 10.7752 20.7524 11.4732 21.5375C12.1711 22.3226 12.9937 23.4595 13 24.6717C13.0062 25.884 12.3892 27.4165 11.523 28.4403C10.339 29.8347 8.94306 30.9339 7.32902 32.0645C5.73992 33.1762 4.25675 34.3193 3.07271 35.3871C1.92606 36.3293 1.37766 36.8569 0.0876798 38C0.0565209 36.9448 -0.00579704 35.7702 0.000434757 34.9412L0.0565209 0.031405Z"*/}
      {/*  fill="black"*/}
      {/*  stroke="black"*/}
      {/*  {...props}*/}
      {/*/>*/}
    </g>
  );
};

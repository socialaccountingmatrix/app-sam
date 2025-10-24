declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

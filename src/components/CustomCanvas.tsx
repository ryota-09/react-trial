import { KonvaEventObject } from 'konva/lib/Node';
import { useState, useRef } from 'react';
import { Layer, Image, Line, Stage } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';

type Props = {
  imageUrl: string;
};

type LineType = {
  points: number[];
}

export const CustomCanvas = ({ imageUrl }: Props) => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [image, status] = useImage(imageUrl, 'anonymous');
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage | null>(null);


  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return

    const pos = stage.getPointerPosition();
    if (!pos) return

    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return

    const stage = e.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point?.x ?? 0, point?.y ?? 0]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleExport = async () => {
    if (!stageRef.current) return;

    const dataURL = stageRef.current.toDataURL({
      width: image?.width,
      height: image?.height,
      pixelRatio: 1
    });

    const a = document.createElement("a");
    a.href = dataURL ?? "";
    a.download = "image.png";

    a.click();
  };

  return (
    <>
      {status === 'loaded' && image && (
        <Stage
          width={image.width} // イメージのロード後に設定された幅
          height={image.height} // イメージのロード後に設定された高さ
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Image
              image={image}
              width={image.width} // イメージのロード後に設定された幅
              height={image.height} // イメージのロード後に設定された高さ
            />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#ffffff"
                strokeWidth={40}
                lineCap="round"
                globalCompositeOperation="destination-out"
              />
            ))}
          </Layer>
        </Stage>
      )}
      <button onClick={handleExport}>画像をエクスポート</button>
    </>
  );
};

/**
 * フッターコンポーネントProps
 */
interface DataTableFooterProps {
  startOptions?: React.ReactNode;
  endOptions?: React.ReactNode;
}

/**
 * データーテーブルフッターコンポーネント
 * @summary フッターのレイアウトを提供する。
 * @param param0
 * @returns
 */
export function DataTableFooter({ startOptions, endOptions }: DataTableFooterProps) {
  return (
    <div className="flex items-center justify-between sticky bottom-[0px] py-1 bg-primary-foreground">
      {startOptions && <div className="flex-1 text-sm text-muted-foreground">{startOptions}</div>}
      {endOptions && <div className="flex items-center space-x-6 lg:space-x-8">{endOptions}</div>}
    </div>
  );
}

import { RunningSessionEntriesContent } from './_components/RunningSessionEntriesContent';
import { eventEntryPreview } from './eventEntries.data';

/** 기본 화면의 상태 소유자를 연결합니다. (Connects the default route to its shared state owner.) */
export default function Page() {
  return <RunningSessionEntriesContent more={eventEntryPreview.more} />;
}

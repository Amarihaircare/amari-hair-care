import { DocumentSuccess } from "@/assets/icons";
import { useModal } from "@/hooks/useModal";
import en from "@/language/en";
import { Button } from "../ui/button";
import PurifiedHtml from "./PurifiedHtml";

export default function Modal() {
  const { modal, setModal } = useModal();

  const handleClose = () => setModal(undefined);

  if (!modal) return <></>;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded bg-white p-4 py-10 shadow lg:max-w-[35%]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-500">
          <DocumentSuccess className="text-4xl text-green-500" />
        </div>
        <h2 className="text-center text-2xl font-bold lg:text-4xl">
          {modal.title}
        </h2>
        <PurifiedHtml html={modal.description} />

        <Button onClick={handleClose} className="mt-6 min-w-[300px]">
          {en.continue}
        </Button>
      </div>
    </div>
  );
}

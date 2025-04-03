import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGlobalStore } from "@/lib/useGlobalStore";

const AlertDialogProvider = () => {
  const { alertOpen, alertConfig, updateAlertOpen } = useGlobalStore();

  const handleConfirm = () => {
    if (alertConfig?.onConfirm) {
      alertConfig.onConfirm();
    }
    updateAlertOpen(false);
  };

  const handleCancel = () => {
    if (alertConfig?.onCancel) {
      alertConfig.onCancel();
    }
    updateAlertOpen(false);
  };

  if (!alertConfig) return null;

  return (
    <AlertDialog open={alertOpen} onOpenChange={updateAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {alertConfig.title || "Confirmation Required"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig.description ||
              "Are you sure you want to perform this action?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {alertConfig.cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {alertConfig.confirmLabel || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertDialogProvider };

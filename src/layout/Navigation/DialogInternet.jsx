import { Typography } from "@mui/material";
import { PanBasicDialog, PanDialogActionsArray } from "pankosmia-rcl";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";
export default function PanDialogInternetRequired({
  internetRequired,
  setInternetRequired,
  ActionButton,
  nameProduct,
}) {
  const { i18nRef } = useContext(i18nContext);
  return (
    <PanBasicDialog
      titleLabel={doI18n(
        "library:pankosmia-rcl:internet_required_title",
        i18nRef.current,
      )}
      isOpen={internetRequired}
      closeFn={() => setInternetRequired(false)}
      actionsButtonArray={PanDialogActionsArray({
        actionLabel: doI18n("library:pankosmia-rcl:accept", i18nRef.current),
        closeFn: () => setInternetRequired(false),
        closeLabel: doI18n("library:pankosmia-rcl:cancel", i18nRef.current),
        actionFn: ActionButton,
      })}
    >
      <Typography variant="body1">
        {doI18n(
          "library:pankosmia-rcl:internet_required_message",
          i18nRef.current,
        ).replace("{app_name}", nameProduct)}
      </Typography>
    </PanBasicDialog>
  );
}

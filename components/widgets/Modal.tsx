import styles from "@/styles/modal.module.css";
import { useModal } from "@/store/useModal";

export default function Modal() {
  const { content, hideModal } = useModal();

  function closeModal() {
    hideModal();
  }

  if (!content) return null;

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains(styles.modal__background)) {
          closeModal();
        }
      }}
      className={`${styles.modal__background}`}
    >
      <div className={`${styles.modal__content}`}>{content}</div>
    </div>
  );
}

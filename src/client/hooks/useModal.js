import { useEffect, useId, useRef } from "react";
import useLockedBody from "./useLockedBody";

export default function useModal({ focusOnOpenRef=null, focusOnCloseRef=null, initialIsOpen=false } = {}) {
  const [isOpen, setIsOpen] = useLockedBody(initialIsOpen);
  const modalRef = useRef(null);
  const labelId = useId();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getModalProps = () => {
    const modalClickHandler = (event) => {
      event.stopPropagation();
    };
    const modalKeyDownHandler = (event) => {
      if (event.code === 'Escape') {
        event.stopPropagation();
        closeModal();
      }
    };

    return {
      role: "dialog",
      ref: modalRef,
      "aria-labelledby": labelId,
      "aria-modal": true,
      onClick: modalClickHandler,
      onKeyDown: modalKeyDownHandler,
    };
  };

  useEffect(() => {
    if (focusOnOpenRef?.current) {
      focusOnOpenRef.current.focus();
    } else if (modalRef.current) {
      focusFirstDescendant(modalRef.current);
    }
    return () => {
      focusOnCloseRef?.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    // keep focus within modal until closed
    const { current: modalNode } = modalRef;
    const modalParent = modalNode ? modalNode.parentNode : null;
    const pre = document.createElement("div");
    const post = document.createElement("div");
    pre.tabIndex = 0;
    post.tabIndex = 0;

    if (modalNode) {
      pre.addEventListener("focus", () => {
        focusLastDescendant(modalNode);
      });
      post.addEventListener("focus", () => {
        focusFirstDescendant(modalNode);
      });
      modalParent.insertBefore(pre, modalNode);
      modalParent.appendChild(post);
    }

    return () => {
      if (modalParent) {
        modalParent.removeChild(pre);
        modalParent.removeChild(post);
      }
    };
  }, [isOpen]);

  return {
    isOpen,
    openModal,
    closeModal,
    getModalProps,
    labelId,
  };
}

const focusFirstDescendant = (element) => {
  for (let i = 0; i < element.childNodes.length; i++) {
    let child = element.childNodes[i];
    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
};

const focusLastDescendant = (element) => {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    let child = element.childNodes[i];
    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
};

const attemptFocus = (element) => {
  if (!isFocusable(element)) return false;
  element.focus();
  return document.activeElement === element;
};

const isFocusable = (element) => {
  if (element.tabIndex >= 0) return true;
  if (element.tabIndex < 0) return false;
  if (element.disabled) return false;

  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel != "ignore";
    case "INPUT":
      return element.type != "hidden";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
};

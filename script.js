// script.js

const SUPABASE_REST_URL =
  "https://psscidyzhxgegemgirhb.supabase.co/rest/v1";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_rqyVjQDLkWZu1XoHq4aIAw_Y9_RHMXz";

const consultationPopup = document.getElementById("consultationPopup");
const videoPopup = document.getElementById("videoPopup");
const imagePopup = document.getElementById("imagePopup");

const consultationForm = document.getElementById("consultationForm");
const formStatus = document.getElementById("formStatus");
const popupVideoFrame = document.getElementById("popupVideoFrame");
const videoPopupTitle = document.getElementById("videoPopupTitle");
const popupImage = document.getElementById("popupImage");

function openPopup(popup) {
  if (!popup) return;

  popup.classList.add("is-open");
  popup.setAttribute("aria-hidden", "false");
  document.body.classList.add("popup-is-open");

  const firstFocusableElement = popup.querySelector(
    "input, textarea, button"
  );

  firstFocusableElement?.focus();
}

function closePopup(popup) {
  if (!popup) return;

  popup.classList.remove("is-open");
  popup.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".popup.is-open")) {
    document.body.classList.remove("popup-is-open");
  }
}

function closeAllPopups() {
  closePopup(consultationPopup);
  closePopup(videoPopup);
  closePopup(imagePopup);

  if (popupVideoFrame) {
    popupVideoFrame.src = "";
  }

  if (popupImage) {
    popupImage.src = "";
    popupImage.alt = "";
  }
}

document.querySelectorAll(".popup-open-button").forEach((button) => {
  button.addEventListener("click", () => {
    openPopup(consultationPopup);
  });
});

document.querySelectorAll("[data-popup-close]").forEach((element) => {
  element.addEventListener("click", () => {
    closePopup(consultationPopup);
  });
});

document.querySelectorAll("[data-video-close]").forEach((element) => {
  element.addEventListener("click", () => {
    if (popupVideoFrame) {
      popupVideoFrame.src = "";
    }

    closePopup(videoPopup);
  });
});

document.querySelectorAll("[data-image-close]").forEach((element) => {
  element.addEventListener("click", () => {
    if (popupImage) {
      popupImage.src = "";
      popupImage.alt = "";
    }

    closePopup(imagePopup);
  });
});

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const videoId = button.dataset.video;
    const videoTitle = button.dataset.title || "Perfume video";

    if (!videoId || !popupVideoFrame) return;

    if (videoPopupTitle) {
      videoPopupTitle.textContent = videoTitle;
    }

    popupVideoFrame.src =
      `https://www.youtube-nocookie.com/embed/${videoId}` +
      "?autoplay=1&rel=0&modestbranding=1";

    openPopup(videoPopup);
  });
});

document
  .querySelectorAll(".img-card img, .gallery-image, [data-lightbox]")
  .forEach((image) => {
    image.addEventListener("click", () => {
      const imageSource = image.currentSrc || image.src;
      const imageAlt = image.alt || "MyPerfume image";

      if (!imageSource || !popupImage) return;

      popupImage.src = imageSource;
      popupImage.alt = imageAlt;

      openPopup(imagePopup);
    });
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPopups();
  }
});

consultationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = consultationForm.querySelector(
    "button[type='submit']"
  );

  const formData = new FormData(consultationForm);

  const submission = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim()
  };

  if (!submission.name || !submission.email || !submission.message) {
    if (formStatus) {
      formStatus.textContent = "Please complete every field.";
      formStatus.className = "form-status error";
    }

    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  if (formStatus) {
    formStatus.textContent = "";
    formStatus.className = "form-status";
  }

  try {
    const response = await fetch(
      `${SUPABASE_REST_URL}/consultation_requests`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(submission)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Supabase request failed.");
    }

    consultationForm.reset();

    if (formStatus) {
      formStatus.textContent =
        "Thank you. Your consultation request has been received.";
      formStatus.className = "form-status";
    }
  } catch (error) {
    if (formStatus) {
      formStatus.textContent =
        "Your request could not be sent. Please try again.";
      formStatus.className = "form-status error";
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send request";
  }
});

window.addEventListener("load", () => {
  if (!sessionStorage.getItem("myperfume-popup-seen")) {
    window.setTimeout(() => {
      openPopup(consultationPopup);
      sessionStorage.setItem("myperfume-popup-seen", "true");
    }, 6000);
  }
});

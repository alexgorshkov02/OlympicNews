async function editComment(event) {
  event.preventDefault();

  const commentID = event.target.getAttribute("id");
  const commentValue = event.target.innerText;

  if (commentID && commentValue) {
    const response = await fetch(`/api/comments/${commentID}`, {
      method: "put",
      body: JSON.stringify({
        comment_text: commentValue,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

async function removeComment(event) {
  event.preventDefault();

  const commentID = event.target.getAttribute("id");

  if (commentID) {
    const response = await fetch(`/api/comments/${commentID}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".news").addEventListener("focusout", editComment);

// TODO: Make an edit button with additional form to edit a message. Can't be used together with editComment for the whole ".news" class because "click" will work instead of "focusout" every time
const RemoveButtons = document.getElementsByClassName("remove-button");
Array.from(RemoveButtons).forEach((RemoveButton) => {
  RemoveButton.addEventListener("click", removeComment);
});

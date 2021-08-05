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

const comments = document.getElementsByClassName("comment");
Array.from(comments).forEach((comment) => {
  comment.addEventListener("focusout", editComment);
});

const RemoveButtons = document.getElementsByClassName("remove-button");
Array.from(RemoveButtons).forEach((RemoveButton) => {
  RemoveButton.addEventListener("click", removeComment);
});

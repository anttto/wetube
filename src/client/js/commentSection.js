const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const deleteBtns = document.querySelectorAll(".delete__comment");


const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    newComment.dataset.id = id;
    const icon = document.createElement("i");
    const span = document.createElement("span");
    const deleteSpan = document.createElement("span");
    span.innerText = ` ${text}`
    deleteSpan.innerText = "Delete";
    icon.className = "far fa-comment-dots";
    deleteSpan.className = "delete__comment";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(deleteSpan);
    videoComments.prepend(newComment);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    // console.log(newCommentId);
    if (response.status === 201) {
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
        textarea.value = "";
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}


const deleteComment = (delBtn, commentId) => {
    const comment = delBtn.target.parentNode;
    comment.classList.add(commentId);
    comment.remove();
}


const handleDelete = async (delBtn) => {
    const commentId = delBtn.target.parentNode.dataset.id;
    const response = await fetch(`/api/videos/${commentId}/delete`, {
        method: "DELETE",
    });
    if (response.status === 201) {
        deleteComment(delBtn, commentId);
    }
}


deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", handleDelete);
})
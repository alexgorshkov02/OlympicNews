module.exports = {
  list: function (context) {
    let result = "<ul>";

    for (let prop in context) {
      // Get the title to display
      const title = "<li>" + prop;

      // Get the comments for the title to display
      const comments = context[prop].map((el) => {
        return `<li> <p contenteditable="true" class = "comment" id="${el.commentID}"> ${el.comment} </p> <button type="button" class="remove-button" id="${el.commentID}">Remove</button></li>`;
      });

      // Merge the title and the comments
      result += `${title} <ul> ${comments.join(" ")} </ul> </li> </br> </br>`;
    }
    return result + "</ul>";
  },
};

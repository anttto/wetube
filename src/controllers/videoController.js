let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 50,
        id:1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 50,
        id:2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 50,
        id:3,
    },
];
export const trending = (req, res) => {
    return res.render("home", {pageTitle:"Home", videos})
};
export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id-1];
    res.render("watch", {pageTitle:`Watching: ${video.title}`, video});   
}
export const getEdit = (req, res) => {
    const id = req.params.id;
    const video = videos[id-1];
    res.render("edit", {pageTitle:`Editing: ${video.title}`, video});
}
export const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title; 

    videos[id-1].title = title;
    res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res) => {
    res.render("upload", {pageTitle: "Upload Video"});
}
 
export const postUpload = (req, res) => {
    const title = req.body.title;
    const id = videos.length + 1;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "Just now",
        views: 0,
        id,
    }
    videos.push(newVideo);
    return res.redirect("/");
}
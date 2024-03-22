import React from "react";

const commentsData = [
  {
    name: "Sachin Rastogi",
    text: "This is a comment.",
    replies: [],
  },
  {
    name: "Sachin Rastogi",
    text: "This is a comment.",
    replies: [
      {
        name: "Sachin Rastogi",
        text: "This is a comment.",
        replies: [
          {
            name: "Sachin Rastogi",
            text: "This is a comment.",
            replies: [
              {
                name: "Sachin Rastogi",
                text: "This is a comment.",
                replies: [
                  {
                    name: "Sachin Rastogi",
                    text: "This is a comment.",
                    replies: [],
                  },
                ],
              },
              {
                name: "Sachin Rastogi",
                text: "This is a comment.",
                replies: [
                  {
                    name: "Sachin Rastogi",
                    text: "This is a comment.",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Sachin Rastogi",
    text: "This is a comment.",
    replies: [],
  },
  {
    name: "Sachin Rastogi",
    text: "This is a comment.",
    replies: [],
  },
  {
    name: "Sachin Rastogi",
    text: "This is a comment.",
    replies: [],
  },
];

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex py-2 px-2 my-1 bg-gray-100 rounded-md">
      <img
        className="h-6 rounded-full"
        alt="user-icon"
        src="./Assets/user-icon.png"
      />
      <div className="px-2">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="ml-4 border border-l-gray-400">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="mx-16 my-8">
      <h1 className="font-bold text-xl">Comments:</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;

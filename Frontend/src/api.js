import axios from "axios";

const Api = axios.create({
  baseURL: "https://penproseserver.iran.liara.run",
});

export const AllPostApi = async () => {
  return await Api.get("/api/post/");
};

//get category
export const CategoryApi = async () => {
  return await Api.get("/api/category/");
};

// Register Api
export const RegisterApi = async (userData) => {
  await Api.post("/api/users/", userData);
};

// Login Api
export const LoginApi = async (userData) => {
  return await Api.post("/auth/", userData);
};

//get UserData
export const UserDataApi = async (username) => {
  return await Api.get(`/api/users/${username}/`);
};

//patch chanage user
export const ChangeUserDataApi = async (username, userData) => {
  return await Api.patch(`/api/users/${username}/`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//Create post
export const SavePostApi = async (token, postData) => {
  return await Api.post("/api/post/", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

//get Profile Post
export const UserPostProfile = async (userid) => {
  return await Api.get(`api/post/?author=${userid}`);
};

//DeletePost Api
export const DeletePost = async (slug, token) => {
  await Api.delete(`/api/post/${slug}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

//Get Post Data
export const GetPostApi = async (slug) => {
  return await Api.get(`/api/post/${slug}/`);
};

//edit post handler
export const EditPostApi = async (slug, token, post) => {
  await Api.patch(`/api/post/${slug}/`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

//edit Find Search Category
export const FindCategoryApi = async (categroy) => {
  return await Api.get(`/api/post/?category=${categroy}`);
};

//edit Find Search Title
export const FindTitleApi = async (title) => {
  return await Api.get(`/api/post/?search=${title}`);
};

//like post
export const LikePostApi = async (likeData, token) => {
  await Api.post(`/api/like/`, likeData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

import { TPost } from "@/definitions/posts";
import { TPhoto } from "@/definitions/photos";
import { TLoginData, TRegistrationData } from "@/definitions/auth";

async function login(data: TLoginData) {
  return await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function signup(data: TRegistrationData) {
  return await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function getPosts(): Promise<TPost[]> {
  return await fetch(`${process.env.POSTS_API_URL}/posts`).then(data => data.json());
}

async function getPost(id: string): Promise<TPost> {
  return await fetch(`${process.env.POSTS_API_URL}/posts/${id}`).then(data => data.json());
}

async function getPhotos(count = 50): Promise<TPhoto[]> {
  return await fetch(
    `${process.env.PHOTOS_API_URL}/list?limit=${count}`,
    { next: { revalidate: 60 }, }
  ).then(res => res.json());
}


export const api = {
  login,
  signup,
  getPosts,
  getPost,
  getPhotos
};

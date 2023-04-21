// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as qs from "qs";

export const BASE_URL =
  "https://private-anon-536d1f758e-blissrecruitmentapi.apiary-mock.com";

export type Params = {
  limit: number;
  offset: number;
  filter?: string | string[];
};

export const getHealthStatus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`${response.status}: Error`);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getQuestions = async (params: Params) => {
  try {
    const response = await fetch(
      `${BASE_URL}/questions?${qs.stringify(params)}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`${response.status}: Error`);
    }
  } catch (err) {
    console.error(err);
  }
};

export const shareScreen = async (email: string, url: string) => {
  try {
    const params = {
      email,
      url,
    };
    const response = await fetch(`${BASE_URL}/share?${qs.stringify(params)}`, {
      method: "POST",
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`${response.status}: Error`);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getQuestion = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/questions/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.log(`${response.status}: Error`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateQuestion = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/questions/${id}`, {
      method: "PUT",
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.log(`${response.status}: Error`);
    }
  } catch (err) {
    console.log(err);
  }
};

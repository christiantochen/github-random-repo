import { Octokit } from "@octokit/core";

class OctokitSingleton {
  private static instance: Octokit;

  private constructor() {}

  public static getInstance(): Octokit {
    if (!OctokitSingleton.instance) {
      OctokitSingleton.instance = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      });
    }
    return OctokitSingleton.instance;
  }
}

export default OctokitSingleton;

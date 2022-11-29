import "./App.css";
import React from "react";
import Deso from "deso-protocol";
import { useState } from "react";

//If you use mainnet, change below "mainnet"
const deso = new Deso();
// deso.node.setUri("https://test.deso.org/");

function App() {
  const [userInfo, setUserInfo] = useState("");
  const [sampleResponse, setSampleResponse] = useState();
  const [loginResponse, setLoginResponse] = useState();
  const [postResponse, setPostResponse] = useState();
  const [postListResponse, setPostListResponse] = useState();
  const [followsResponse, setFollowsResponse] = useState();
  const [nftResponse, setNftResponse] = useState();
  return (
    <div>
      <button
        onClick={async () => {
          const user = await deso.identity.login();
          console.log(user);
          setLoginResponse(JSON.stringify(user, null, 2));
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          deso.identity.logout(deso.identity.getUserKey());
        }}
      >
        logout
      </button>
      <button
        onClick={async () => {
          const user = await deso.user.getSingleProfile({
            PublicKeyBase58Check: deso.identity.getUserKey(),
            // Username: deso.identity.getUser()
          });
          console.log(user);
          setSampleResponse(JSON.stringify(user, null, 2));
          setUserInfo(user);
        }}
      >
        get user
      </button>
      <button
        onClick={async () => {
          const postResponse = await deso.posts.submitPost({
            UpdaterPublicKeyBase58Check: deso.identity.getUserKey(),
            BodyObj: {
              Body: "Hi @DeZoDog, I'm checking out the deso-react app",
              VideoURLs: [],
              ImageURLs: [],
            },
          });
          setPostResponse(JSON.stringify(postResponse, null, 2));
        }}
      >
        submit post
      </button>
      <button
        onClick={async () => {
          const postListResponse = await deso.posts.getPostsForPublicKey(
            deso.identity.getUserKey(), // public key
            'tkskkd'                    // username
          );
          setPostListResponse(JSON.stringify(postListResponse, null, 2));
        }}
      >
        Get 5 posts
     </button>
     <button
        onClick={async () => {
          const followsResponse = await deso.social.getFollowsStateless({
            PublicKeyBase58Check: deso.identity.getUserKey(),
            NumToFetch: 5
          });
          setFollowsResponse(JSON.stringify(followsResponse, null, 2));
        }}
        >
        Get 5 Follows
     </button>
     <button
        onClick={async () => {
          const nftResponse = await deso.nft.getNftsForUser({
            UserPublicKeyBase58Check: deso.identity.getUserKey(),
            ReaderPublicKeyBase58Check: deso.identity.getUserKey(),
          });
          setNftResponse(JSON.stringify(nftResponse, null, 2));
        }}
        >
        Get User's All NFT 
      </button>
    
      <div>
        Login info
        <pre>{loginResponse}</pre>
      </div>
      <div>
        User info：
        {/* <div>{userInfo.Profile.Username}</div> */}
        <pre>{sampleResponse}</pre>
      </div>
      setPostResponse
      <div>
        User info
        <pre>{postResponse}</pre>
      </div>
      <div>
        Show 5 Posts:
        <pre>{postListResponse}</pre>
      </div>
      <div>
        Show 5 Follows:
        <pre>{followsResponse}</pre>
      </div>
      <div>
        All NFT:
        <pre>{nftResponse}</pre>
      </div>
    </div>
  );
}

export default App;

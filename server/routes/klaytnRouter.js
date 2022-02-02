var express = require("express");
var router = express.Router();
const User = require("../models/User");
const NFT = require("../models/NFT");
const KlayNFT = require("../models/KlaynFT");
const CaverExtKAS = require("caver-js-ext-kas");

const axios = require("axios");

//카스 테스트
const accessKeyId = "KASKGXY61FBDCS5DG3H4X9QF";
const secretAccessKey = "fdQtUVnPBvQRKHc2h5JnixThYZ_kKKasdM8zIMRk";
const chainId = 1001;

const caver = new CaverExtKAS();
caver.initKASAPI(chainId, accessKeyId, secretAccessKey);

const contractAddress = "0x1ac133cd73dd754e51dd40102ed3ea7e786f83f2";
const ownerAddress = "0xd23cd63b84e294b304548b9758f647ceb7724241";
const query = {
  size: 100,
};
const result = caver.kas.tokenHistory.getNFTListByOwner(
  contractAddress,
  ownerAddress,
  query
);
result.then(console.log);

router.get("/", function (req, res) {
  res.status(200).send("welcome");
});

router.post("/fetchNFT", async (req, res) => {
  //결과로 유저의 정보 빼와줌
  let reqOwnerAddress = req.body.ownerAddress;
  const contractAddress = "0xA5F33389DA5496f585a7Ea5f8Ca365363e800e65";
  const query = {
    size: 100,
  };
  const result = caver.kas.tokenHistory.getNFTListByOwner(
    contractAddress,
    reqOwnerAddress,
    query
  );
  result
    .then((result) => {
      result.items.map((item) => {
        KlayNFT.findOneAndUpdate(
          {
            NFT_Token_id: item.tokenId,
            contract_address: contractAddress,
          },
          {
            ownerAddress: reqOwnerAddress,
            NFT_Token_id: item.tokenId,
            tokenUri: item.tokenUri,
            transactionHash: item.transacitonHash,
            createdAt: item.createdAt,
          },
          {
            upsert: true,
          }
        ).then((result) => {
          console.log(result);
        });
        //URI들어가서 정보빼오기
        User.findOne({ address: reqOwnerAddress }).then((owner) => {
          console.log(owner._id, " this is id!!!!!!@!@!@!@#!@#@!!@#");
          axios.get(item.tokenUri).then((result) => {
            KlayNFT.findOneAndUpdate(
              { NFT_Token_id: item.tokenId, contract_address: contractAddress },
              {
                name: result.data.name,
                collection: result.data.collection,
                description: result.data.description,
                image_url: result.data.image,
                traits: result.data.attributes,
                owner: owner._id,
                $addToSet: {
                  history: {
                    event: "minted",
                    date: "2022-01-26T01:28:27.337617", //어떻게 해야할지 모르겠어서 일단 이렇게 해둠
                    price: "",
                    from: "",
                    to: reqOwnerAddress,
                  },
                },
              }
            ).then((result) => {
              console.log(result);
              console.log(result._id);
              User.findOneAndUpdate(
                { ownerAddress: reqOwnerAddress },
                { $addToSet: { ownedNFTs: result._id } }
              ).then((result) => {
                console.log(result);
              });
            });
          });
        });
      });
      User.findOne({ address: reqOwnerAddress })
        .populate("ownedNFTs")
        .then((result) => {
          res
            .status(200)
            .send({
              result: result,
              message: "adding NFTs to ownedNFTs in user DB",
            });
        })
        .catch((err) => {
          console.log(err, "this is errererjoerierjoerioejriojeriojerojerio");
          res.status(401).send({ result: err, message: "something's wrong" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ result: err, message: "something's wrong" });
    });
});

router.post("/searchNFT", async (req, res) => {
  KlayNFT.findOne({ openseaId: req.body.openseaId })
    .populate("owner")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ result: err, message: "done" });
    });
});
module.exports = router;

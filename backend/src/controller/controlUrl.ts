import express from "express";
import { urlModel } from "../model/urlModel";
import { url } from "inspector";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { fullUrl } = req.body;
  try {
    const urlFound = await urlModel.findOne({ fullUrl });
    if (urlFound) {
      // res.status(409).json({
      //   msg: "URL already exists",
      // });
      res.send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length === 0) {
      res.status(404).send({ msg: "Urls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send("Url not found");
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findById({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send("Url successfully deleted!");
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

import OpenAI from "openai";
import { isUploadable } from "openai/uploads.mjs";

export const editImage = async (imagePath: string) => {

  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: "",
  });

  const imageContent = await fetchImageBinaryData(imagePath)
  const maskContent = await fetchImageBinaryData("/mask.png")
  console.log(!isUploadable(imageContent))
  // const imageContent = fs.readFileSync(imagePath)
  if (!isUploadable(imageContent)) return
  if (!isUploadable(maskContent)) return
  const response = await openai.images.edit({
    model: "dall-e-2",
    image: imageContent,
    mask: maskContent,
    prompt: "anothrer eye like japanese anime",
    response_format: "url",
  })
  console.log(response.data[0].url)

  return response.data[0].url
}

async function fetchImageBinaryData(imageUrl: string) {
  const blob = await fetch(imageUrl).then((res) => res.blob())
  return new File([blob], "image.png", { type: "image/png" }); // Fileオブジェクトに変換
}
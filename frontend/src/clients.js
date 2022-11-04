import sanityClient from "@sanity/client";
import imageBulder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "3lpda1wq",
  dataset: "production",
  aptVersion: "2021-11-16",
  useCdn: true,
  token:
    "skRbKGh5kbV50Q0zuLaLc7OXCn2enJLmOThgVRuOLm7PNOJTjDkgNDNVPfkDcIHwD8PWHwWFQgZaq4nnEFmKmfaALxnyunxiWxoADH2SIVEYhC70MJMuLc0ZUQ0oZ0DbTns1gMxvBJrPWuyV9P5T08TZG09z1yKk0p0XWahjG1pwMilOngww",
});

const builder = imageBulder(client);

export const urlFor = (source) => builder.image(source);

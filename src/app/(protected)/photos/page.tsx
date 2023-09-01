import Image from "next/image";
import styles from "./page.module.scss";
import { api } from "@/api";
import { TPhoto } from "@/definitions/photos";

export default async function Photos() {
  const data: TPhoto[] = await api.getPhotos();

  return (
    <div className={styles.images}>
      {data.map(({ id, download_url }) => (
        <div key={id} className={styles.image}>
          <Image
            objectFit={"cover"}
            fill
            src={download_url}
            alt={"image"}
          />
        </div>
      ))}
    </div>
  );
}

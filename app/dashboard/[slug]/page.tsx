import styles from "./topic-detail.module.css";

export default function Page({ params }: { params: { slug: string } }) {
  
  return <div>My Post: {params.slug}</div>;
}

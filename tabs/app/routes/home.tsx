import type { Route } from "./+types/home";
import { type Tab, Tabs } from "../tabs/tabs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router Tabs" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const initialTabs: Tab[] = [
    { id: 0, label: 'HTML', value: <p>The HyperText Markup Language or HTML is the
            standard markup language for documents designed to
            be displayed in a web browser.</p>},
    {id: 1, label: 'CSS', value: <p>
            Cascading Style Sheets is a style sheet language
            used for describing the presentation of a document
            written in a markup language such as HTML or XML.
          </p>},
    {id: 2, label: 'JavaScript', value: <p>
            JavaScript, often abbreviated as JS, is a
            programming language that is one of the core
            technologies of the World Wide Web, alongside HTML
            and CSS.
          </p>},
  ]     
    return <Tabs initialTabs={initialTabs} />;
}

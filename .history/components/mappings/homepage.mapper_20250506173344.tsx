import { figmaMapping } from "@builder.io/dev-tools/figma";
import { Header } from "@/components/Layout/Header";

figmaMapping({
  url: "https://www.figma.com/design/gk3fgi86UxOGgZQohLgSGK/VCP-demo?node-id=1-88&node-type=SYMBOL&t=IQ27EabKQr6yqH2k-11",
  mapper(figma) {
    return <Header></Header>;
  },
});

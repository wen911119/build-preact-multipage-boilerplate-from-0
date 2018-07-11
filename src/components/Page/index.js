import { h, Component } from "preact";
import px2rem from "p-to-r";
const Page = ({ children, header = {}, footer = {}, bgColor = "#fff" }) => {
  return (
    <div
      style={{
        paddingTop: px2rem(header.height || 0),
        paddingBottom: px2rem(footer.height || 0),
        minHeight: "100%",
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: bgColor
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
          left: 0,
          top: 0,
          zIndex: header.index || 1
        }}
      >
        {header.render && header.render()}
      </div>
      {children}
      <div
        style={{
          position: "fixed",
          width: "100%",
          left: 0,
          bottom: 0,
          zIndex: footer.index || 1
        }}
      >
        {footer.render && footer.render()}
      </div>
    </div>
  );
};

export default Page;

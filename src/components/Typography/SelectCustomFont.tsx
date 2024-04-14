import React, { use, useEffect, useState } from "react";
import { Models } from "appwrite";
import { storage } from "@/lib/clientAppwrite";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onChange: ({ name}: { name: string; }) => void;
}

export default function SelectCustomFont({ onChange }: Props) {
  const [customFonts, setCustomFonts] = useState<Models.FileList>();

  useEffect(() => {
    const fetchFonts = async () => {
      const res = await storage.listFiles("65f05c4a768b37937d9e");
      setCustomFonts(res);
    };
    fetchFonts();
  }, []);

  const handleChange = (value: string) => {
    const url = storage.getFileView("65f05c4a768b37937d9e", value).href;
    console.log(value)
    onChange({ name: value });
  };

  return (
    <Select disabled={!customFonts} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a font" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{customFonts?.files.length ?? 0 > 0 ? "Custom Fonts" : "No custom fonts found"}</SelectLabel>
          {customFonts?.files.map((font, index) => {
            return (
              <SelectItem key={index} value={font.$id}>
                <Item font={font} />
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function Item({ font }: { font: Models.File }) {
  const [fontFace, setFontFace] = useState<FontFace>();

  useEffect(() => {
    const url = storage.getFileView("65f05c4a768b37937d9e", font.$id).href;
    const fontFace = new FontFace("test", `url(${url})`);
    fontFace.load().then((loadedFontFace) => {
      document.fonts.add(loadedFontFace);
      setFontFace(loadedFontFace);
    });
  }, [font]);

  const fontName = font.name.split(".")[0];

  return (
    <span
      style={{
        fontFamily: fontFace?.family,
      }}
      className="text-xl tracking-wide"
    >
      {fontName}
    </span>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertisElementHandler, customSettings } from "@/types/pageEditor";
import { ToolTipButton } from "@/components/ui/tooltip-button";
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  Columns,
  LucideImage,
  Rows,
} from "lucide-react";

interface Props {
  activeStyle: customSettings;
  handleOnChanges: (e: PropertisElementHandler) => void;
}

export default function DisplaySettings({ activeStyle, handleOnChanges }: Props) {
  // This function is used to handle the display change
  function handleDisplayChange(value: string) {
    handleOnChanges({
      target: {
        id: "display",
        value,
      },
    });
  }

  return (
    <>
      <RadioGroup value={activeStyle.display ? activeStyle.display : "block"} className="flex pb-4" onValueChange={handleDisplayChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="block" id="block" />
          <Label htmlFor="display-block">Block</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="flex" id="display-flex" />
          <Label htmlFor="display-flex">Flex</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="grid" id="display-flex" />
          <Label htmlFor="display-flex">Grid</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="display-none" />
          <Label htmlFor="display-none">None</Label>
        </div>
      </RadioGroup>
      <Label className="text-muted-foreground">Justify Content</Label>
      <Tabs
        onValueChange={(e) => {
          handleOnChanges({
            target: {
              id: "justifyContent",
              value: e,
            },
          });
        }}
        value={activeStyle.justifyContent}
        className="pb-4"
      >
        <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
          <ToolTipButton description="Space between">
            <TabsTrigger value="space-between" className="size-10 data-[state=active]:bg-muted">
              <AlignHorizontalSpaceBetween size={18} />
            </TabsTrigger>
          </ToolTipButton>
          <ToolTipButton description="Space evenly">
            <TabsTrigger value="space-evenly" className="size-10 data-[state=active]:bg-muted">
              <AlignHorizontalSpaceAround size={18} />
            </TabsTrigger>
          </ToolTipButton>
          <ToolTipButton description="Justify center">
            <TabsTrigger value="center" className="size-10 data-[state=active]:bg-muted">
              <AlignHorizontalJustifyCenterIcon size={18} />
            </TabsTrigger>
          </ToolTipButton>
          <ToolTipButton description="Justify start">
            <TabsTrigger value="start" className="size-10 data-[state=active]:bg-muted">
              <AlignHorizontalJustifyStart size={18} />
            </TabsTrigger>
          </ToolTipButton>
          <ToolTipButton description="Justify end">
            <TabsTrigger value="end" className="size-10 data-[state=active]:bg-muted">
              <AlignHorizontalJustifyEnd size={18} />
            </TabsTrigger>
          </ToolTipButton>
        </TabsList>
      </Tabs>
      <Label className="text-muted-foreground">Align Items</Label>
      <Tabs
        onValueChange={(e) => {
          handleOnChanges({
            target: {
              id: "alignItems",
              value: e,
            },
          });
        }}
        value={activeStyle.alignItems}
      >
        <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
          <ToolTipButton description="Align start">
            <TabsTrigger value="start" className="size-10 data-[state=active]:bg-muted">
              <AlignVerticalJustifyStart size={18} />
            </TabsTrigger>
          </ToolTipButton>
          <ToolTipButton description="Align Center">
            <TabsTrigger value="center" className="size-10 data-[state=active]:bg-muted">
              <AlignVerticalJustifyCenter size={18} />
            </TabsTrigger>
          </ToolTipButton>
          <ToolTipButton description="Align End">
            <TabsTrigger value="end" className="size-10 data-[state=active]:bg-muted">
              <AlignVerticalJustifyEnd size={18} />
            </TabsTrigger>
          </ToolTipButton>
        </TabsList>
      </Tabs>

      <div className=" flex flex-col gap-2 mt-2">
        <Label className="text-muted-foreground">Direction</Label>
        <Tabs
          onValueChange={(e) => {
            handleOnChanges({
              target: {
                id: "flexDirection",
                value: e,
              },
            });
          }}
          value={activeStyle.flexDirection}
        >
          <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
            <ToolTipButton description="Row">
              <TabsTrigger value="row" className="size-10 data-[state=active]:bg-muted">
                <Columns size={18} />
              </TabsTrigger>
            </ToolTipButton>

            <ToolTipButton description="Row Reverse">
              <TabsTrigger value="row-reverse" className="size-10 data-[state=active]:bg-muted">
                <Columns size={18} />
              </TabsTrigger>
            </ToolTipButton>

            <ToolTipButton description="Column">
              <TabsTrigger value="column" className="size-10 data-[state=active]:bg-muted">
                <Rows size={18} />
              </TabsTrigger>
            </ToolTipButton>

            <ToolTipButton description="Column Reverse">
              <TabsTrigger value="column-reverse" className="size-10 data-[state=active]:bg-muted">
                <Rows size={18} />
              </TabsTrigger>
            </ToolTipButton>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}



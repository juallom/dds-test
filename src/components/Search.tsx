import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VisuallyHidden,
} from "@chakra-ui/react";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";

type SearchProps = {
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  label: string;
  clearTextLabel: string;
};

export const Search: React.FC<SearchProps> = ({
  filterValue,
  setFilterValue,
  label,
  clearTextLabel,
}) => {
  return (
    <>
      <InputGroup mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          pr={"3.5rem"}
          aria-label={label}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <InputRightElement width="3rem">
          <Button
            h="1.75rem"
            size="sm"
            colorScheme={"blackAlpha"}
            variant={"ghost"}
            onClick={() => setFilterValue("")}
          >
            <SmallCloseIcon color={"gray.400"} />
            <VisuallyHidden>{clearTextLabel}</VisuallyHidden>
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

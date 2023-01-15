import axios from "axios";
import { useState } from "react";
import {
  Navbar,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Code,
} from "ui";

type FormElements = {
  elements: {
    apiKey: HTMLInputElement;
  };
};

export default function Web() {
  const [data, setData] = useState(null);
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement & FormElements>
  ) => {
    e.preventDefault();
    const apiKey = e.currentTarget.elements.apiKey.value;
    try {
      const response = await axios.post("http://localhost:8080/everhour", {
        apiKey: apiKey,
      });
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>EverHour API KEY</FormLabel>
            <Input name="apiKey" />
            <FormHelperText>We'll never share your API KEY.</FormHelperText>
          </FormControl>
          <Button type="submit" mt={2}>
            Submit
          </Button>
        </form>
        <Code mt={4}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Code>
      </Container>
    </>
  );
}

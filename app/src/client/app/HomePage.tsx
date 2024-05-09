import { useAuth } from "wasp/client/auth";
import LoopForm from "../components/loopform/LoopForm";
import LoopList from "../components/looplist/LoopList";
import { useQuery } from "wasp/client/operations";
import { getActiveLoops } from "wasp/client/operations";
import { useEffect } from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const HomePage = () => {
  const { data: loops, error, isLoading, refetch } = useQuery(getActiveLoops);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      window.$sleek=[];
      window.SLEEK_PRODUCT_ID=291162644;
      (function(){
        d=document;
        s=d.createElement("script");
        s.src="https://client.sleekplan.com/sdk/e.js";
        s.async=1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    `;
    document.head.appendChild(script);
  }, []);

  if (isLoading) {
    return (
      <Flex>
        <Box>
          <Heading>Waiting for the loops to jump through the hoops...</Heading>
          <Text>🐰</Text>
        </Box>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex>
        <Box>
          <Heading>Oops, the loops got tangled!</Heading>
          <Text>🌀 {error.message}🌀</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <LoopForm />
      <LoopList loops={loops} refetch={refetch} />
    </Box>
  );
};

export default HomePage;

import { Box, Heading, HStack, VStack } from "@chakra-ui/react";

import ProtectedRoute from "../../../src/auth/ProtectedRoute";
import Sidebar from "../../../components/app/Sidebar";

export default function AccountsPage() {
  return (
    <ProtectedRoute>
      <Sidebar>
        <Box
          bgColor="gray.100"
          padding="6"
          rounded={"5px"}
          border={"1px"}
          borderColor={"gray.300"}
          mx={"15px"}
        >
          <HStack justifyContent="space-between">
            <VStack align="flex-start">
              <Heading size="lg" mr="2.5rem">
                Accounts
              </Heading>
            </VStack>
          </HStack>
        </Box>
        <Box rounded={"5px"} px={"0px"}></Box>
      </Sidebar>
    </ProtectedRoute>
  );
}

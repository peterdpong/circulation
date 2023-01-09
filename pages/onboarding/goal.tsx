import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ProtectedRoute from "../../src/auth/ProtectedRoute";
import { addUserGoal, getUserGoal } from "../../src/firebase/UserActions";
import { useAuth } from "../../src/auth/auth";

// Boilerplate data
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Path to Goal",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Net Worth",
      data: [1, 2, 4, 16, 32, 64, 128],
      borderColor: "rgb(30, 159, 92)",
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, "rgba(45,216,129,1)");
        gradient.addColorStop(1, "rgba(45,216,129,0)");
        return gradient;
      },
    },
  ],
};
export default function SuggestionsPage() {
  const router = useRouter();

  const { useRequiredAuth } = useAuth();
  const userData = useRequiredAuth();

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" my={"25px"}>
        <Button size="sm" onClick={() => router.push("/onboarding/budget")}>
          Back
        </Button>
        <Heading>Choose your goal</Heading>
        <Text fontSize={"md"}>
          Choose one of the generated goals based on your finances or change it
          just the way you like it!
        </Text>
        <Formik
          initialValues={{
            selectedGoalInfo: userData ? getUserGoal(userData?.uid) : null,
          }}
          onSubmit={(values, actions) => {
            if (userData) {
              if (
                values.selectedGoalInfo &&
                getUserGoal(userData.uid) !== values.selectedGoalInfo
              ) {
                addUserGoal(userData.uid, values.selectedGoalInfo);
              }
              actions.resetForm;
              console.log(values);
              router.push("/app");
            } else {
              alert("Error: User not logged in...");
              router.push("/login");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Container
              maxW="container.xl"
              as="form"
              p={"0px"}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSubmit={handleSubmit as any}
            >
              <Box
                bg={"gray.100"}
                rounded={"5px"}
                my={"25px"}
                p={"20px"}
                border={"1px"}
                borderColor={"gray.300"}
              >
                <Heading mb={"8px"} fontSize={"xl"}>
                  Selected Goal
                </Heading>
                <Line options={options} data={data} />
              </Box>

              <Heading fontSize={"xl"}>Adjust goal</Heading>

              <SimpleGrid columns={3} spacing={5}>
                <Box
                  bg={"gray.100"}
                  rounded={"5px"}
                  my={"25px"}
                  p={"20px"}
                  border={"1px"}
                  borderColor={"gray.300"}
                >
                  <Heading fontSize={"xl"}>Net Worth Goal</Heading>
                  <Text fontSize={"xl"}>$65,000</Text>
                  <Slider
                    colorScheme={"green"}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
                <Box
                  bg={"gray.100"}
                  rounded={"5px"}
                  my={"25px"}
                  p={"20px"}
                  border={"1px"}
                  borderColor={"gray.300"}
                >
                  <Heading fontSize={"xl"}>Monthly Savings Goal</Heading>
                  <Text fontSize={"xl"}>$500</Text>
                  <Slider
                    colorScheme={"green"}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
                <Box
                  bg={"gray.100"}
                  rounded={"5px"}
                  my={"25px"}
                  p={"20px"}
                  border={"1px"}
                  borderColor={"gray.300"}
                >
                  <Heading fontSize={"xl"}>Timeline</Heading>
                  <Text fontSize={"xl"}>5 Years</Text>
                  <Slider
                    colorScheme={"green"}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              </SimpleGrid>

              <Box
                bg={"gray.100"}
                rounded={"5px"}
                my={"25px"}
                p={"20px"}
                border={"1px"}
                borderColor={"gray.300"}
              >
                <Heading mb={"8px"} fontSize={"xl"}>
                  Suggested goals
                </Heading>
                <SimpleGrid columns={3} spacing={3}>
                  <Card>
                    <CardBody>
                      <Heading size="sm"> Passive Goal </Heading>
                      <Stat>
                        <StatLabel>Monthly Savings</StatLabel>
                        <StatNumber>$250</StatNumber>
                        <StatLabel>Net Worth Goal in 5 years</StatLabel>
                        <StatNumber fontSize="md">$50,000</StatNumber>
                      </Stat>
                      <Button my={"4px"} size={"sm"} colorScheme={"green"}>
                        Select
                      </Button>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <Box>
                        <Heading size="sm">Neutral Goal</Heading>
                        <Stat>
                          <StatLabel>Monthly Savings</StatLabel>
                          <StatNumber>$500</StatNumber>
                          <StatLabel>Net Worth Goal in 5 years</StatLabel>
                          <StatNumber fontSize="md">$65,000</StatNumber>
                        </Stat>
                        <Button my={"4px"} size={"sm"} colorScheme={"green"}>
                          Select
                        </Button>
                      </Box>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <Box>
                        <Heading size="sm"> Aggresive Goal </Heading>
                        <Stat>
                          <StatLabel>Monthly Savings</StatLabel>
                          <StatNumber>$1000</StatNumber>
                          <StatLabel>Net Worth Goal in 5 years</StatLabel>
                          <StatNumber fontSize="md">$85,000</StatNumber>
                        </Stat>
                        <Button my={"4px"} size={"sm"} colorScheme={"green"}>
                          Select
                        </Button>
                      </Box>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>

              <SubmitButton colorScheme={"green"}>Finish</SubmitButton>
            </Container>
          )}
        </Formik>
      </Container>
    </ProtectedRoute>
  );
}

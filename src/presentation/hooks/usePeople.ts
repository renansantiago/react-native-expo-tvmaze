import { useQuery } from "@tanstack/react-query";
import { PersonRepositoryImpl } from "../../data/repositories/PersonRepositoryImpl";
import {
  SearchPeopleUseCase,
  GetPersonDetailsUseCase,
} from "../../domain/usecases";

const personRepository = new PersonRepositoryImpl();
const searchPeopleUseCase = new SearchPeopleUseCase(personRepository);
const getPersonDetailsUseCase = new GetPersonDetailsUseCase(personRepository);

export const useSearchPeople = (query: string) => {
  return useQuery({
    queryKey: ["search-people", query],
    queryFn: () => searchPeopleUseCase.execute(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const usePersonDetails = (personId: number) => {
  return useQuery({
    queryKey: ["person-details", personId],
    queryFn: () => getPersonDetailsUseCase.execute(personId),
    enabled: !!personId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

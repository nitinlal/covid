import { IsEmail } from 'class-validator';

export class StatsDto {
  data: {
    total_cases: string;
    recovery_cases: string;
    death_cases: string;
    last_update: string;
    currently_infected: string;
    cases_with_outcome: string;
    mild_condition_active_cases: string;
    critical_condition_active_cases: string;
    recovered_closed_cases: string;
    death_closed_cases: string;
    closed_cases_recovered_percentage: string;
    closed_cases_death_percentage: string;
    active_cases_mild_percentage: string;
    active_cases_critical_percentage: string;
    general_death_rate: string;
  };
  status: string;
}

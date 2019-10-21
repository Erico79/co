export const required = value => value ? undefined : 'This field is required';

export const numberGreaterThanZero = value => value <= 0 ? 'Contribution Amount must be greater than 0' : undefined;

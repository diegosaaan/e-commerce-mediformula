module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss)$': 'identity-obj-proxy',
    '^@fonts/(.*)$': '<rootDir>/src/assets/fonts/$1',
    '^@images/(.*)$': '<rootDir>/src/assets/images/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@containers/(.*)$': '<rootDir>/src/containers/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@actions/(.*)$': '<rootDir>/src/redux/actions/$1',
    '^@reducers/(.*)$': '<rootDir>/src/redux/reducers/$1',
    '^@store/(.*)$': '<rootDir>/src/redux/store/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@enums/(.*)$': '<rootDir>/src/enums/$1',
    '^@helpers/(.*)$': '<rootDir>/src/utils/helpers/$1',
    '^@hooks/(.*)$': '<rootDir>/src/utils/hooks/$1',
  },
};
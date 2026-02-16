function [X_train, Y_train, X_test, Y_test, n_test_0, n_test_1, n_test_2, n_train_0, n_train_1, n_train_2] = feature_extraction(train_folder_path, test_folder_path)
    % load data
    train_data = dir(fullfile(train_folder_path, "*.csv"));
    train_data_labels = dir(fullfile(train_folder_path, "*.xlsx"));
    
    test_data = dir(fullfile(test_folder_path, "*.csv"));
    test_data_labels = dir(fullfile(test_folder_path, "*.xlsx"));
    
    [X_train, Y_train, n_train_0, n_train_1, n_train_2] = extract_features(train_data_labels, train_data, train_folder_path);
    [X_test, Y_test, n_test_0, n_test_1, n_test_2] = extract_features(test_data_labels, test_data, test_folder_path);
    
end
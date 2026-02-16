function [X_train, Y_train, X_test, Y_test] = features_preperation(X_train, Y_train, X_test, Y_test)
n_train_0 = 125;
n_train_1 = 244; 
n_train_2 = 113; 

n_test_0 = 15;
n_test_1 = 205;
n_test_2 = 71;
%% Handle missing values
X_both = [X_train;X_test];
ind_end_train = size(X_train,1);
X_both = fillmissing(X_both','linear',2,'EndValues','nearest'); 
X_both = X_both';



%% normalizing values
X_norm = zeros(size(X_both));
for i=1:size(X_both,2)
    p = prctile(X_both(:,i),[5 95]);
    if (p(2)-p(1)) ~= 0
        X_norm(:,i)=(X_both(:,i)-p(1))./abs(p(2)-p(1));
    else
        X_norm(:,i)=0;
    end
end

% [X_train,~] = normalize(X_train,1,'range'); 
% [X_test,~] = normalize(X_test,1,'range'); 

X_train = X_both(1:ind_end_train,:);
X_test = X_both(ind_end_train+1:end,:);
%% resample minority groups
iterations = 0;
while iterations < 3
    iterations = iterations+1;
    % Get indices of minority class observations
    [n_samples_minor_train, minority_class_train] = min([n_train_0,n_train_1,n_train_2]);
    minority_class_train = minority_class_train-1;
    minority_train_indices = find(Y_train == minority_class_train);
    
    
    % Get indices of majority class observations
    [n_samples_major_train,majority_class_train] = max([n_train_0,n_train_1,n_train_2]);
    majority_class_train = majority_class_train-1;
    % majority_train_indices = find(Y_train == majority_class_train);
    

    % Oversample minority class
    X_train = [X_train; repmat(X_train(minority_train_indices,:), floor((n_samples_major_train-n_samples_minor_train)/n_samples_minor_train),1)];
    Y_train = [Y_train; repmat(Y_train(minority_train_indices,:), floor((n_samples_major_train-n_samples_minor_train)/n_samples_minor_train),1)];
    n_train_0 = length(find(Y_train==0));
    n_train_1 = length(find(Y_train==1));
    n_train_2 = length(find(Y_train==2)); 


%     % Oversample minority class
%     X_train = [X_train; bootstrp(floor((n_samples_major_train-n_samples_minor_train)/n_samples_minor_train),@mean ,X_train(minority_train_indices,:))];
%     Y_train = [Y_train; bootstrp(floor((n_samples_major_train-n_samples_minor_train)/n_samples_minor_train),@mean,Y_train(minority_train_indices,:))];
%     n_train_0 = length(find(Y_train==0));
%     n_train_1 = length(find(Y_train==1));
%     n_train_2 = length(find(Y_train==2)); 
    

end



function [best_model, best_model_accuracy,score_knn_adaboost_lsvm, sensitivity_arr, precision_arr, f1_score_arr, train_auc_arr, test_auc_arr] = bhq_classify_load(X_test, Y_test, X_train, Y_train)

num_models = 3;
num_classes = 3;
train_auc_arr = zeros(1,num_models);
test_auc_arr = zeros(1,num_models);
KFold = 30;
score_knn_adaboost_lsvm = [];
% sesensitivitylect a working point with best prediction
sensitivity_arr = zeros(1,num_models);
precision_arr = zeros(1,num_models);
accuracy = zeros(1,num_models);
f1_score_arr = zeros(1,num_models);
cost =   [0,2,2; 1,0,1;1,1,0]; %[0, (2*(244/125)), (2*(113/125)); 
%         (1*(205/15)), 0 ,(1*(71/15));
%         (1*(113/125)), (1*(244/125)), 0]; %[0,4,3;1,0,1;2,3,0]; 
for n=1:num_models % number of models to check
% Create a multiclass classifier using error-correcting output codes (ECOC)
    switch n
        case 1
            % checking performance of SVM:
            % Create a template for the classifiers
            template = templateSVM('KernelFunction', 'linear', 'Standardize', true,'BoxConstraint',998.44,'KernelScale',98.862);
            Mdl = fitcsvm(X_train, Y_train, 'Learners', template,'Cost',cost,'Coding','onevsone','CrossVal','on','KFold',KFold);
        case 2
            % checking performance of Adaboost:
            Mdl = fitcensemble(X_train, Y_train, 'Method', 'AdaBoostM2', 'NumLearningCycles',183,'Learners','tree','Cost',cost,'LearnRate',0.93,'CrossVal','on','KFold',KFold);
        case 3      
            % checking performance of KNN:
            Mdl = fitcknn(X_train, Y_train, 'NumNeighbors', 10,'Cost',cost,'Distance','minkowski','CrossVal','on','KFold',KFold);
    end    
    %% run the prediction:
    % prediction on train set:
%     [Y_pred,score] = predict(Mdl, X_train);
    [Y_pred,score] = kfoldPredict(Mdl);
    score_knn_adaboost_lsvm(:,n) = score(:,n);
    tab=tabulate(Y_train);
    [~,~,~,AUC]=perfcurve(Y_train,score(:,n),tab(n));
    train_auc_arr(n) = AUC;
    accuracy(n) = sum(Y_pred == Y_train) / length(Y_train);
    
    cp = classperf(Y_train,Y_pred,'Positive',1,'Negative',0);
    recall= cp.Sensitivity;
    ppv= cp.PositivePredictiveValue;
    F1_score= 2*recall*ppv / (recall+ppv);

end
Kappa = normalize(Kappa,2,'range');
MSE = normalize(MSE,2,'range');
MAE = normalize(MAE,2,'range');
accuracy = normalize(accuracy,2,'range');
[best_model_accuracy,best_model_accuracy_indx] = max(mean([Kappa; MSE; MAE; accuracy]));
if best_model_accuracy_indx==1
    best_model = 'Linear SVM';
    template = templateSVM('KernelFunction', 'linear', 'Standardize', true);
    Mdl = fitcecoc(X_train, Y_train, 'Learners', template,'Cost',cost,'Coding','onevsall');
elseif best_model_accuracy_indx==2
    best_model = 'Adaboost';
    Mdl = fitcensemble(X_train, Y_train, 'Method', 'AdaBoostM2', 'NumLearningCycles',218,'Learners','tree','Cost',cost,'LearnRate',0.1);
else
    best_model = 'KNN';
    Mdl = fitcknn(X_train, Y_train, 'NumNeighbors', 10,'Cost',cost,'Distance','correlation');
end

for l=1:num_classes %number of classes
    % prediction on test set:
    cvmdl = crossval(Mdl);
    [Y_pred,score] = predict(cvmdl.Trained{1},X_test);
%     [Y_pred,score] = predict(Mdl, X_test);
    C_test = confusionmat(Y_test, Y_pred);
    tab=tabulate(Y_test);
    [~,~,~,AUC]=perfcurve(Y_test,score(:,l),tab(l));
    test_auc_arr(l) = AUC;
    % Calculate the classification accuracy
    sensitivity_arr(l) = C_test(l,l) / sum(C_test(l,:)); %TP/(TP+FN);
    precision_arr(l) = C_test(l,l) / sum(C_test(:,l)); %TP/(TP+FP);
    accuracy(l) = C_test(l,l) / sum(C_test(:)); %(TP+TN)/(TP+TN+FP+FN);
    f1_score_arr(l) = 2*(precision_arr(l)*sensitivity_arr(l))/(precision_arr(l)+sensitivity_arr(l));
end
best_model_accuracy = max(accuracy);
end
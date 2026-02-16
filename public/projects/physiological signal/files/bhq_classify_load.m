function [best_model, best_model_accuracy,score_knn_adaboost_lsvm, sensitivity_arr, precision_arr, f1_score_arr, train_auc_arr, test_auc_arr] = bhq_classify_load(X_test, Y_test, X_train, Y_train)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% A summary of my solution %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% In order to deal with the imbalanced data I created replecations of the rows in X matrix for the classe in minority,
% I also used a cost matrix with weights in the relations of the different groups' sizes, 
% and calculated the cohen's kappa for the classification accuracy.
% I train all the 3 models requested and checked each one's acuuracy, cohen's kappa, MSE and fo classificaiton accuracy measurement
% and took the model which provided the highest mean of all these parameters to be the model that I release.
% I also used cross validation and ECOC for the SVM model as we needed a multiclass model.
% I order to tune the hyper parameters I used Bayesian optimizer.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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
Kappa = zeros(1,num_models);
MSE = zeros(1,num_models);
MAE = zeros(1,num_models);
cost =   [0, (2*(244/125)), (2*(113/125)); 
        (1*(205/15)), 0 ,(1*(71/15));
        (1*(113/125)), (1*(244/125)), 0]; %[0,4,3;1,0,1;2,3,0]; [0,2,2; 1,0,1;1,1,0];
for n=1:num_models % number of models to check
% Create a multiclass classifier using error-correcting output codes (ECOC)
    switch n
        case 1
            % checking performance of SVM:
            % Create a template for the classifiers
            template = templateSVM('KernelFunction', 'linear', 'Standardize', true,'BoxConstraint',0.0010309,'KernelScale',0.0084956);
            Mdl = fitcecoc(X_train, Y_train, 'Learners', template,'Cost',cost,'Coding','onevsone','CrossVal','on','KFold',KFold);
        case 2
            % checking performance of Adaboost:
            Mdl = fitcensemble(X_train, Y_train, 'Method', 'AdaBoostM2', 'NumLearningCycles',218,'Learners','tree','Cost',cost,'LearnRate',0.1,'CrossVal','on','KFold',KFold);
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

    % Calculate the classification accuracy
    C = confusionmat(Y_train, Y_pred);
    % Calculate Cohen's Kappa
    po = (C(1,1) + C(2,2)) / sum(C(:));
    pe = sum(C(1,:) .* C(2,:)) / (sum(C(1,:)) * sum(C(2,:)));
    kappa = (po - pe) / (1 - pe);
    Kappa(n) = kappa;
    MSE(n) = immse(Y_pred,Y_train);
    MAE(n) = mean(abs(Y_pred - Y_train));
    accuracy(n) = sum(Y_pred == Y_train) / length(Y_train);

end
Kappa = normalize(Kappa,2,'range');
MSE = normalize(MSE,2,'range');
MAE = normalize(MAE,2,'range');
accuracy = normalize(accuracy,2,'range');
[best_model_accuracy,best_model_accuracy_indx] = max(mean([Kappa; MSE; MAE; accuracy]));
if best_model_accuracy_indx==1
    best_model = 'Linear SVM';
    Mdl = fitcecoc(X_train, Y_train, 'Learners', template,'Cost',cost,'Coding','onevsone');
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
    if isnan(sensitivity_arr(l))
        sensitivity_arr(l)=0;
    end
    precision_arr(l) = C_test(l,l) / sum(C_test(:,l)); %TP/(TP+FP);
    if isnan(precision_arr(l))
        precision_arr(l)=0;
    end
    accuracy(l) = C_test(l,l) / sum(C_test(:)); %(TP+TN)/(TP+TN+FP+FN);
    if isnan(accuracy(l))
        accuracy(l)=0;
    end
    f1_score_arr(l) = 2*(precision_arr(l)*sensitivity_arr(l))/(precision_arr(l)+sensitivity_arr(l));
    if isnan(f1_score_arr(l))
        f1_score_arr(l)=0;
    end
end
best_model_accuracy = max(accuracy);
end


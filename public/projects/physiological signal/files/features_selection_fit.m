function [Xs_train, best_comb] = features_selection_fit(Xv_train, Y_train)
% best_comb - best combination in any format         
%% features-label exhaustic search, choosing best 10 features
    len=size(Xv_train,2);
    X_discreted=zeros(size(Xv_train));

%%%%%% different option of discretisizing%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% OPTION 1:
%     [X_discreted,~] = discretize(Xv_train, 3); %descritization of the feature matrix into 3 bins

%%%% OPTION 2:
%     for r = 1:len
%         figure;
%         p = tsprctile(Xv_train(:,r),[0,25,75,100]);
%         subplot(1,2,1); plot(1:1:length(Xv_train(:,r)),Xv_train(:,r),'.');  yline(p(1),'-');  yline(p(2),'-');  yline(p(3),'-'); yline(p(4),'-');
%         [X_discreted(:,r),~] = discretize(Xv_train(:,r),3); %tsprctile(Xv_train(:,r),[0,25,75,100]));
%         subplot(1,2,2); histogram(X_discreted(:,r));
%         sgtitle(r)
%     end

%%%% OPTION 3:
%     for r = 1:len
%         figure;
%         avg = mean(Xv_train(:,r));
%         q = tsprctile(Xv_train(:,r),[0,25,75,100]);
%         STD1 = avg-(q(2));
%         STD2 = avg+(q(3));
%         Max = max(max(Xv_train(:,r)),STD2)+1;
%         Min = min(min(Xv_train(:,r)),STD1)-1;
%         subplot(1,2,1); plot(1:1:length(Xv_train(:,r)),Xv_train(:,r),'.');  yline(Min,'-');  yline(STD1,'-');  yline(STD2,'-'); yline(Max,'-');
%         [X_discreted(:,r),~] = discretize(Xv_train(:,r),[Min, STD1,STD2, Max]); %tsprctile(Xv_train(:,r),[0,33,66,100]));
%         subplot(1,2,2); histogram(X_discreted(:,r));
%         sgtitle(r)
%     end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    for r = 1:len
        avg = mean(Xv_train(:,r));
        STD = 0.5*std(Xv_train(:,r));
        Max = max(max(Xv_train(:,r)),avg+STD)+1;
        Min = min(min(Xv_train(:,r)),avg-STD)-1;
        [X_discreted(:,r),~] = discretize(Xv_train(:,r),[Min avg-STD avg+STD Max]); 
%         figure;
%         subplot(1,2,1); plot(1:1:length(Xv_train(:,r)),Xv_train(:,r),'.');  yline(Min,'-');  yline(avg-STD,'-');  yline(avg+STD,'-'); yline(Max,'-');
%         subplot(1,2,2); histogram(X_discreted(:,r));
%         sgtitle(r)
    end

    combinations = nchoosek(1:size(X_discreted, 2), 10); %matrix of all combinations choosing 10 features out of Xv
    n_combinations = size(combinations, 1);
    MRMR = zeros(n_combinations, 1);
    for comb = 1:n_combinations
        current_comb = combinations(comb, :);
        current_features = X_discreted(:, current_comb);
        [indx,MRMR_scores] = fscmrmr(current_features, Y_train); %calculating MI for the current combination
        MRMR(comb) = MRMR_scores(indx(1));
    end
    indx_best = find(MRMR==max(MRMR));
    best_comb = combinations(indx_best(end),:);
    Xs_train = X_discreted(:, best_comb);
end